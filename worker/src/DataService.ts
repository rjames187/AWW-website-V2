export default class DataService {
  public static instance: DataService;
  private kv: KVNamespace;

  public static startService(kv: KVNamespace) {
    if (DataService.instance === undefined) {
      DataService.instance = new DataService(kv);
    }
  }

  private constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  public async fetchData(key: string): Promise<string> {
    try {
      const res = await this.kv.get(key);
      if (!res) {
        throw new Error(`No data found for key: ${key}`);
      }
      return res;
    } catch (error: any) {
      console.error(`KV fetch error for key ${key}:`, error);
      throw error;
    }
  }

  public async putData(key: string, value: string): Promise<void> {
    try {
      console.log(`Attempting to put data in KV for key: ${key}, value length: ${value.length}`);
      await this.kv.put(key, value);
      console.log(`Successfully put data in KV for key: ${key}`);
    } catch (error: any) {
      console.error(`KV put error for key ${key}:`, error);
      throw error;
    }
  }
}