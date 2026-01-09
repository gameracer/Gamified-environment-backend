export namespace AuthDtos {
    export interface Register {
        username: string;
        password: string;
        displayName: string;
    }

    export interface Login {
        username: string;
        password: string;
    }

    export interface TokenResponse {
        token: string;
    }
}
