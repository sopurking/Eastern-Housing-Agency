import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const maxDuration = 300; // 5 minutes for video uploads

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'properties';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitize filename
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    console.log('Original filename:', file.name);
    console.log('Sanitized filename:', sanitizedName);
    console.log('File size:', (file.size / (1024 * 1024)).toFixed(2), 'MB');

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type
    const isVideo = file.type.startsWith('video/');

    // Upload to Cloudinary with extended timeout for videos
    const result = await new Promise((resolve, reject) => {
      const uploadOptions: any = {
        folder,
        public_id: `${folder}_${Date.now()}_${sanitizedName.split('.')[0]}`,
        resource_type: 'auto',
        timeout: 300000, // 5 minutes
      };

      // For videos, add chunk size to handle large files better
      if (isVideo) {
        uploadOptions.chunk_size = 6000000; // 6MB chunks
      }

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ 
      success: true, 
      url: (result as any).secure_url 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}