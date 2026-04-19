export const CARBON_APP_STORE_URL =
  "https://apps.apple.com/us/app/carbon-tasks-simplified/id6759137244";

export const CARBON_WEB_URL = "https://carbonapp.co/";

const footerLinkClass =
  "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-border bg-surface px-5 py-3 text-center text-sm font-semibold leading-snug text-foreground shadow-sm transition hover:border-accent hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] sm:flex-initial sm:max-w-md sm:min-w-[14rem]";

type AppStoreButtonProps = {
  href?: string;
};

export function AppStoreButton({ href = CARBON_APP_STORE_URL }: AppStoreButtonProps) {
  return (
    <div className="not-prose my-10 flex w-full justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Carbon on the App Store (opens in a new tab)"
        className="group inline-flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-3.5 text-center text-[15px] font-semibold leading-snug text-white shadow-md shadow-accent/25 transition hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] sm:w-auto sm:justify-center sm:text-left"
      >
        <span
          className="shrink-0 text-2xl leading-none transition-transform group-hover:scale-105"
          aria-hidden
        >
          
        </span>
        <span className="min-w-0 text-balance">Download Carbon on the App Store</span>
      </a>
    </div>
  );
}

export function CarbonFooterButtons() {
  return (
    <div className="not-prose my-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      <a
        href={CARBON_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Carbon on the App Store (opens in a new tab)"
        className={`group ${footerLinkClass}`}
      >
        <span className="shrink-0 text-lg leading-none transition-transform group-hover:scale-105" aria-hidden>
          
        </span>
        <span className="text-balance">Download Carbon on the App Store</span>
      </a>
      <a
        href={CARBON_WEB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="carbonapp.co (opens in a new tab)"
        className={footerLinkClass}
      >
        carbonapp.co
      </a>
    </div>
  );
}
