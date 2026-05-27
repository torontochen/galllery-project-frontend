import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const artList = [
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_0373.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18wMzczLndlYnAiLCJpYXQiOjE3NzE0NTAyODIsImV4cCI6MTgwMjk4NjI4Mn0._C7XNVhuhACEs936UuysrPRZmDMAcbnwQW8Hpxuo2w4",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_1103.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18xMTAzLndlYnAiLCJpYXQiOjE3NzE1MjA1NzIsImV4cCI6MTgwMzA1NjU3Mn0.e8XyLbiyo1URNgvQflzPwmjpXiJBTD6rwuvlOZqPxK0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_1107.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18xMTA3LndlYnAiLCJpYXQiOjE3NzE1MjA2MDEsImV4cCI6MTgwMzA1NjYwMX0.Mpdlsb48C-nS6EAAeUjKQR4goiy4LxAm0l9U9qrFB-s",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_3031.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18zMDMxLmpwZWciLCJpYXQiOjE3NzE1MjA2MjMsImV4cCI6MTgwMzA1NjYyM30.C9Jorx_YS-sA8jOjXvD19L0RLwYziFZrkEo5VAKpUp8",
];

export default function AboutUsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full py-4 min-h-[60vh] bg-[url('/bg-img.jpg')]  bg-cover bg-center bg-no-repeat ">
      <div className="  w-8/12 max-md:w-11/12 text-justify p-6 text-shadowcolor mx-auto   flex flex-col justify-start items-start gap-5">
        <span className="text-4xl block  font-bold mb-4 self-center">
          About Us
        </span>
        <section className="self-center">
          <div className="space-y-4 w-full self-center ">
            <p className="mb-2 text-lg">
              Welcome to Monohaus – the marketplace of arts in dream!
            </p>
          </div>
        </section>
        <section>
          <div className="space-y-4 ">
            <p className="mb-2 ">
              Monohaus is more than a gallery; it is a laboratory for visual
              storytelling. Founded on the principle that every artist’s journey
              is a "house" of its own, we provide a platform for emerging and
              established voices to showcase cohesive, thematic bodies of work.
              We bridge the gap between the artist’s studio and the public eye,
              fostering an environment where art is accessible, conversational,
              and transformative. From avant-garde installations to timeless
              photography, Monohaus is a home for the bold and the curated.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-shadowcolor mb-4">
            Our Vision
          </h2>
          <div className="space-y-4 ">
            <p className="mb-2 ">
              The Monohaus Gallery believes creativity is fundamental to an open
              and engaged world.
            </p>
          </div>
        </section>
        <section>
          <span
            className=" w-full text-xl block
           font-bold text-shadowcolor mb-4"
          >
            Our Mission
          </span>
          <div className="space-y-4 ">
            <p className="mb-2 ">
              Through art we create paths to share perspectives, build and
              engage communities and shape our collective future together.
            </p>
          </div>
        </section>
        <section className="w-full">
          <span className="text-xl font-bold text-shadowcolor mb-4 block">
            VALUES
          </span>

          <div className="space-y-4">
            <ul className=" indent-4 list-none space-y-2">
              <li className="text-textcolor">
                - We are respectful of the unceded Indigenous territory upon
                which we are situated.
              </li>
              <li className="text-textcolor">
                - We are committed to creating an inclusive and respectful
                environment.
              </li>
              <li className="text-textcolor">
                - We believe that curiosity is a pathway to innovation.
              </li>
              <li className="text-textcolor">
                - We establish clear goals and expectations to cultivate a
                culture of accountability.
              </li>
              <li className="text-textcolor">
                - We foster successful collaboration through thoughtful
                communication and active listening.
              </li>
            </ul>
          </div>
        </section>
        <section>
          <span
            className=" w-full text-xl block
           font-bold text-shadowcolor mb-4"
          >
            Inclusivity, Diversity, Equity and Accessibility (IDEA) Statement
          </span>
          <div className="space-y-4 ">
            <p className="mb-2 ">
              The Monohaus Gallery commits to providing equitable access to
              everyone. We actively support accessibility, anti-racism, 2SLGBTQ+
              inclusion and encourage diversity in our staff, visitors,
              volunteers and programming. We cultivate a safer space where all
              voices are heard, valued and represented. The Gallery stands
              against hatred, discrimination, racism, homophobia and
              transphobia.
            </p>
          </div>
        </section>
        <button
          onClick={() => navigate("/exhibitions")}
          className="self-center text-xl font-semibold  border-[1px] py-2 px-6 rounded-md text-shadowcolor bg-backgroudcolor hover:bg-shadowcolor hover:text-backgroundcolor mx-auto mb-4"
        >
          Go Explore!
        </button>
        <p className="mb-2 ">
          We aim to create a secure, hassle-free, and community-driven
          marketplace With verified sellers, escrow protection, and a
          user-friendly system, we ensure every trade is smooth and reliable,
          making you trade in peace of mind
        </p>
      </div>
      <div className="w-8/12 flex justify-center items-center mx-auto ">
        {artList.map((artUrl, index) => (
          <img
            key={index}
            src={artUrl}
            alt={`artwork-${index}`}
            className="w-1/4 h-[20vh] object-cover "
          />
        ))}
      </div>
    </div>
  );
}
