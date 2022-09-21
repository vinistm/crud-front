import {LoginProvider} from "./Login"
import {RegisterProvider} from "./Register"

const Providers = ({ children})=>{
    return(
        <RegisterProvider>
            <LoginProvider>

            </LoginProvider>
        </RegisterProvider>
    )
};

export default Providers