import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navbar />
      
      {/* 👇 关键在这里：pt-24 就是为了防止被导航栏挡住 */}
      <main className="flex-1 container mx-auto px-4 py-12 pt-24 max-w-4xl">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-12">
            We're here to help! Whether you have questions about our calculators, found a bug, or just want to say hello, feel free to reach out.
          </p>

          <div className="grid gap-6">
            {/* Email Support Card */}
            <div className="p-6 border rounded-lg shadow-sm bg-card flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full mt-1">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For general inquiries, partnerships, and support questions.
                </p>
                <a 
                  href="mailto:support@rvsmartcalc.com" 
                  className="text-primary font-medium hover:underline"
                >
                  support@rvsmartcalc.com
                </a>
              </div>
            </div>

            {/* Feedback Card */}
            <div className="p-6 border rounded-lg shadow-sm bg-card flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full mt-1">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Feedback & Suggestions</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Have an idea for a new calculator? Let us know!
                </p>
                <a 
                  href="mailto:feedback@rvsmartcalc.com" 
                  className="text-primary font-medium hover:underline"
                >
                  feedback@rvsmartcalc.com
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}