interface WelcomeSectionProps {
  data: any;
}

export default function WelcomeSection({
  data,
}: WelcomeSectionProps) {
  if (!data) return null;

  return (
    <section className="py-20 pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Welcome Image */}

          <div>

            {data.welcomeImage ? (
              <img
                src={data.welcomeImage}
                alt={data.welcomeTitle}
                className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-full h-[450px] rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100">
                <span className="text-gray-500 text-lg">
                  Welcome Image
                </span>
              </div>
            )}

          </div>

          {/* Welcome Content */}

          <div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {data.welcomeTitle}
            </h2>

            <p className="text-gray-600 leading-8 text-lg whitespace-pre-line">
              {data.welcomeDescription}
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}