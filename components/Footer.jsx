import { Linkedin, Github, Twitter } from 'lucide-react'


const Footer = () => {
    return (
        <div className="container border-t border-gray-300 mt-5  flex justify-between items-center mx-auto p-4" >
            <h1 className=" text-xs" >Made By <a href="https://mubashirdev.netlify.app/" target='_blank' > Mubashir </a></h1>
            <div className='flex items-center gap-2' >
                <a  href="https://www.linkedin.com/in/mubashir1902/" target='_blank'>
                    <Linkedin size={16} />
                </a>
                <a href="https://github.com/Mubashir1920/" target='_blank' >
                    <Github size={16} />
                </a>
                <a href="https://x.com/TheTechGuy_1" target='_blank' >
                    <Twitter size={16} />
                </a>

            </div>
        </div>
    )
}

export default Footer
