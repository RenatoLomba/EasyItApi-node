export interface IDeleteAppointment {
  execute(id: string): Promise<boolean>
}
