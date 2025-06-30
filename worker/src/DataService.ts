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
    const res = await this.kv.get(key);
    if (!res) {
      throw new Error(`No data found for key: ${key}`);
    }
    return res;
  }

  public async putData(key: string, value: string): Promise<void> {
    await this.kv.put(key, value);
  }
}