import { importProvidersFrom } from '@angular/core';
import {} from '@angular/common/http';

/**
 * httpProviders
 *
 * Helper array that imports HttpClientModule for the standalone provider model.
 * It is spread into appConfig.providers so HttpClient is available to services.
 */
export const httpProviders = [importProvidersFrom(HttpClientModule)];
