import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IConfig {
    socketUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    private _config: IConfig;
    private _envConfigUrl: string = 'config/config.env.json';

    constructor(private http: HttpClient) {}

    public init(): Promise<IConfig> {
        return new Promise((resolve, reject) => {
            const envConfig: Observable<Object> = this.http.get(this._envConfigUrl, {
                params: {
                    v: String(Math.round(new Date().getTime() / 3600000) * 3600000)
                }
            });

            envConfig.subscribe((content: IConfig) => {
                this._config = content;
                resolve(content);
            });
        });
    }
    
    get config(): IConfig {
        return this._config;
    }

}
