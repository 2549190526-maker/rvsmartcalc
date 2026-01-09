import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 pt-24 max-w-3xl">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-primary">Affiliate Disclosure</h1>
          
          <div className="bg-muted/50 p-4 rounded-lg border border-border mb-8 text-sm text-muted-foreground">
            <strong>Brief Summary:</strong> RVSmartCalc is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you.
          </div>

          <p>
            Transparency is a core value at <strong>RVSmartCalc</strong>. We believe in being upfront about how this website is funded and how we can afford to provide our financial calculators and guides for free.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">How We Are Funded</h2>
          <p>
            Running a website involves significant costs, including server hosting, development, design, and content creation. To cover these costs and keep our RV loan and affordability calculators free for everyone to use, we participate in various affiliate marketing programs.
          </p>
          <p>
            This means that some of the links on this website are "affiliate links." If you click on such a link and make a purchase, we may receive a small commission.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Important to Know:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Extra Cost to You:</strong> The price of the product is the same for you whether you use our link or go directly to the vendor's site. The commission comes out of the vendor's pocket, not yours.</li>
            <li><strong>Unbiased Content:</strong> Our goal is to help you make smart financial decisions regarding RV ownership. We do not accept payment in exchange for positive reviews. Our recommendations are based on our own research and analysis.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Amazon Associates Program Disclosure</h2>
          <p>
            RVSmartCalc is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
          <p>
            As an Amazon Associate, we earn from qualifying purchases.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Thank You for Your Support</h2>
          <p>
            By using our affiliate links, you are helping to support RVSmartCalc, which allows us to continue building better tools and writing helpful guides for the RV community. We truly appreciate your support!
          </p>

          <hr className="my-8 border-border" />

          <p className="text-sm text-muted-foreground">
            If you have any questions regarding this disclosure, please feel free to contact us via our Contact page.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}