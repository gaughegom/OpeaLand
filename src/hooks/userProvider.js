import { useMemo } from "react";

import logger from "./logger";

const useUserProvider = (injectedProvider, localProvider) =>
	useMemo(() => {
		if (injectedProvider) {
			logger.debug("Using injected user provider", injectedProvider);
			return injectedProvider;
		}

		if (!localProvider) {
			return undefined;
		}
	}, [injectedProvider, localProvider]);
