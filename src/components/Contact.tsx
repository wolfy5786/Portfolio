import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Get In Touch</h2>
        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
          Looking for Software Internships for Summer and Fall 2026
        </p>
        
        <div>
          <h3 className="mb-8">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-300 mb-1">Email</p>
                <p>makhijaniankush24@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-300 mb-1">Phone</p>
                <p>+1 (856) 263 1347 </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-300 mb-1">Location</p>
                <p>San Jose, CA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}