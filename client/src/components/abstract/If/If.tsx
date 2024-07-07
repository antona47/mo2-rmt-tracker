export interface IIf {
  children: any
  condition: any
}



const If = ({ children, condition }: IIf) => (condition ? <>{children}</> : null)



export default If