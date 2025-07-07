import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-base-100 border border-primary/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row items-center p-6 sm:p-8">
          <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full mb-6 md:mb-0 md:mr-8 animate-pulse">
            <ZapIcon className="size-12 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-3">
            <h3 className="text-2xl font-bold text-primary tracking-tight">
              Rate Limit Reached
            </h3>
            <p className="text-base-content/90 leading-relaxed">
              You've made too many requests in a short period. Please wait a
              moment before trying again.
            </p>
            <p className="text-sm text-base-content/60">
              For the best experience, try again in a few seconds or consider
              upgrading your plan.
            </p>
            <button
              className="btn btn-outline btn-sm mt-4 transition-all duration-300 hover:bg-primary/10"
              onClick={() => window.location.reload()}
              aria-label="Retry now"
            >
              Retry Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
