export interface IInitializerService {
    SeedUserData(): Promise<any>;
    MigrateTables(): Promise<any>;
}