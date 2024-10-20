import { toast } from "react-toastify";

export const Notificatons=(socket)=>{
    socket.on('connect', () => {
        console.log("socket connect");
      })
  
      socket.on("newUser",(data)=>{
        console.log("message",data);
        toast.success(`${data} joined the niche say hii`)
      })
      socket.on("newUser",(data)=>{
        console.log("message",data);
        toast.success(`New Job Added`)
      })
      
      return () => {
        socket.disconnect();
      }
}