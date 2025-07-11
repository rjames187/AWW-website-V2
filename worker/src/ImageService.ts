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

  public async uploadImage(key: string, image: any): Promise<void> {
    await this.bucket.put(key, image);
  }
}