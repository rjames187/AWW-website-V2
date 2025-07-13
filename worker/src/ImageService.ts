export default class ImageService {
  public static instance: ImageService;
  private bucket: R2Bucket;

  public static startService(bucket: R2Bucket) {
    if (ImageService.instance === undefined) {
      ImageService.instance = new ImageService(bucket);
    }
  }

  constructor(bucket: R2Bucket) {
    this.bucket = bucket;
  }

  public async uploadImage(key: string, image: any): Promise<{ success: boolean; message: string }> {
    try {
      await this.bucket.put(key, image);
      return { success: true, message: "Image uploaded successfully" };
    } catch (error) {
      console.error('R2 upload error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to upload image to storage" 
      };
    }
  }
}