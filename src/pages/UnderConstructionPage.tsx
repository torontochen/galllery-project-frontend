export default function UnderConstructionPage() {
  return (
    <div className="w-full py-4 min-h-[60vh] bg-[url('/bg-img.jpg')] flex justify-center items-center bg-cover bg-center bg-no-repeat ">
      <div className="flex flex-col justify-center items-center ">
        <img
          src="https://www.animatedimages.org/data/media/1104/animated-construction-worker-image-0046.gif"
          alt="under construction"
          className="object-cover"
          width={300}
          height={400}
        />
        <span className="text-2xl inline-block font-bold text-shadowcolor">
          Coming Soon ...
        </span>
      </div>
    </div>
  );
}
