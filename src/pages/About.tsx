import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import aboutImage from "@/assets/about-team.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Kyboot</h1>
            
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={aboutImage}
                alt="Kyboot team"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-lg text-muted-foreground">
                At Kyboot, we believe that great performance starts from the ground up. Founded by athletes and designed for champions, our mission is to create footwear that pushes the boundaries of innovation and style.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-4">Our Story</h2>
              <p className="text-muted-foreground">
                What started as a vision to revolutionize athletic footwear has grown into a passion for excellence. We combine cutting-edge technology with timeless design principles to create shoes that not only perform but inspire.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground">
                    Constantly pushing the boundaries of what's possible in athletic footwear design.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Quality</h3>
                  <p className="text-muted-foreground">
                    Every pair is crafted with meticulous attention to detail and premium materials.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Performance</h3>
                  <p className="text-muted-foreground">
                    Engineered to help you achieve your best, whether training or competing.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-4">Join Our Journey</h2>
              <p className="text-muted-foreground">
                We're more than just a shoe company – we're a community of athletes, dreamers, and achievers. Join us in redefining what's possible.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
