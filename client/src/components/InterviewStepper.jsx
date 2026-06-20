import {
  Briefcase,
  Mic,
  Sparkles,
  Check
} from "lucide-react";

function InterviewStepper({ step }) {
  const steps = [
    {
      id: 1,
      label: "Role Selection",
      icon: Briefcase,
    },
    {
      id: 2,
      label: "Interview",
      icon: Mic,
    },
    {
      id: 3,
      label: "AI Evaluation",
      icon: Sparkles,
    },
  ];

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-12">

      {/* Progress Bar */}

      <div className="relative max-w-5xl mx-auto">

        <div className="absolute top-7 left-0 w-full h-1 bg-slate-800 rounded-full" />

        <div
          className="absolute top-7 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />

        <div className="flex justify-between relative">

          {steps.map((item) => {
            const Icon = item.icon;

            const completed = step > item.id;
            const active = step === item.id;

            return (
              <div
                key={item.id}
                className="flex flex-col items-center"
              >
                {/* Circle */}

                <div
                  className={`
                    relative w-14 h-14 rounded-2xl
                    flex items-center justify-center
                    border transition-all duration-300

                    ${
                      completed
                        ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/30"
                        : active
                        ? "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/40 scale-110"
                        : "bg-slate-900 border-slate-700"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={22} />
                  ) : (
                    <Icon size={22} />
                  )}

                  {active && (
                    <div className="absolute inset-0 rounded-2xl animate-ping bg-blue-500 opacity-20" />
                  )}
                </div>

                {/* Label */}

                <span
                  className={`
                    mt-4 text-sm font-medium transition-all

                    ${
                      active
                        ? "text-blue-400"
                        : completed
                        ? "text-green-400"
                        : "text-slate-500"
                    }
                  `}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Card */}

      <div className="mt-8 max-w-3xl mx-auto">

        <div className="bg-slate-900/70 backdrop-blur-lg border border-slate-800 rounded-2xl p-5">

          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-white font-semibold text-lg">
                {steps[step - 1]?.label}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Step {step} of {steps.length}
              </p>
            </div>

            <div className="text-blue-400 font-semibold">
              {Math.round((step / steps.length) * 100)}%
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default InterviewStepper;