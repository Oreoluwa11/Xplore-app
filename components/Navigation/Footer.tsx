import React from 'react'
import { Github, Linkedin, Instagram, Heart, Phone, Mail, Copyright } from "lucide-react";


const Footer = () => {

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/thattechhijabi_?igsh=eHJsZm9leGM2aGpr&utm_source=qr" },
    { icon: Github, label: "GitHub", url: "https://github.com/Oreoluwa11" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/anoba-rahmat-042833286/" },
  ]

  return (
    <div className='mt-20 px-8 md:px-20 py-6 border-t border-primary'>
      <div className='md:grid md:grid-cols-3 gap-50'>
        <div className=' '>
          <h1 className='font-bold text-2xl'><span className='text-primary'>XP</span>lore</h1>
          <p className='text-text mt-5'>Discover Lagos restaurants in minutes, <br />savor the flavor for much longer.</p>
        </div>

        <div className='md:mt-0 mt-5'>
          <h1 className='font-bold text-2xl mb-5'><span className='text-primary'>Co</span>ntact</h1>
          <div className="flex items-center">
            <Phone className="text-primary mr-4" size={24} />
            <div className='flex'>
              <p className="font-medium mr-2">Tel: </p>
             <a href="tel:+2348130297049" className='text-text'>+234 813 029 7049</a>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <Mail className="text-primary mr-4" size={24} />
            <div className='flex'>
              <p className="font-medium mr-2">Email: </p>
              <a href="mailto:rahmatanoba@gmail.com" className="text-text">
                rahmatanoba@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 md:self-end md:justify-self-end justify-center align-items-center md:mt-0 mt-10">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-primary hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform"
                aria-label={social.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      <p className="text-muted-foreground font-bold flex justify-center items-center mt-3 md:mt-10 text-text">
        <Copyright size={20} className='text-primary mr-2'/> {currentYear} Anoba Rahmat.
      </p>
    </div>
  )
}

export default Footer
// justify-center items-center