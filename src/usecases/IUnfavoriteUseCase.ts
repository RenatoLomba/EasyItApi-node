export interface IUnfavoriteUseCase {
  execute(id: string): Promise<boolean>;
}
