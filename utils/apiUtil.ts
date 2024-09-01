import { APIRequestContext, request } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class APIUtil {
    private accessToken: string | null = null;

    // Method to obtain access token using OAuth 2.0
    public async getAccessToken(apiBaseUrl:any ,endpoint: string, clientID:any,clientSecret:any): Promise<any> {
            const response = await global.req.post(apiBaseUrl+endpoint, {
                form: {
                    client_id: clientID,
                    client_secret:clientSecret,
                    scope: "assigned",
                    grant_type: 'client_credentials',
                },
            });

            if (response.ok()) {
                const data = await response.json();
                this.accessToken = data.access_token;
                console.log('Access token obtained successfully.');
            } else {
                throw new Error(`Failed to obtain access token: ${response.statusText()}`);
            }
        return this.accessToken;
    }

    // General method to make POST requests
    public async post(apiBaseUrl:any ,endpoint: string, data: any): Promise<any> {
        const response = await global.req.post(apiBaseUrl+endpoint, {
            data: data, // Ensure the body is properly formatted
            headers: {
                'Authorization': `Bearer ${global.token}`, // Ensure the token is included
                'Content-Type': 'application/json'
            }
        });

        if (response?.ok()) {
            return await response.json();
        } else {
            console.error(await response.json());
            throw new Error(`POST request failed: ${response?.statusText()}`);
        }
    }

    // PUT method
    public async put(apiBaseUrl: any, endpoint: string, data: any): Promise<any> {
        const response = await global.req.put(apiBaseUrl + endpoint, {
            data: data,
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response?.ok()) {
            return await response.json();
        } else {
            console.error(await response.json());
            throw new Error(`PUT request failed: ${response?.statusText()}`);
        }
    }

    // DELETE method
    public async delete(apiBaseUrl: any, endpoint: string): Promise<any> {
        const response = await global.req.delete(apiBaseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response?.ok()) {
            return await response.json();
        } else {
            console.error(await response.json());
            throw new Error(`DELETE request failed: ${response?.statusText()}`);
        }
    }

    // PATCH method
    public async patch(apiBaseUrl: any, endpoint: string, data: any): Promise<any> {
        const response = await global.req.patch(apiBaseUrl + endpoint, {
            data: data,
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response?.ok()) {
            return await response.json();
        } else {
            console.error(await response.json());
            throw new Error(`PATCH request failed: ${response?.statusText()}`);
        }
    }

    // GET method
    public async get(apiBaseUrl: any, endpoint: string, params?: Record<string, string>): Promise<any> {
        let url = apiBaseUrl + endpoint;
    
        // Append query parameters if provided
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }
    
        const response = await global.req.get(url, {
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'
            }
        });
    
        if (response?.ok()) {
            return await response.json();
        } else {
            console.error(await response.json());
            throw new Error(`GET request failed: ${response?.statusText()}`);
        }
    }
    
}
