# 本地安装nginx 


## windows 

* [官方](https://nginx.org/en/download.html)下载nginx 
* 解压文件，配置环境变量添加PATH,如：D:\codes\appsmith\nginx-1.26.2 （按实际路径调整）
* nginx 配置 `nginx.dev.conf`

```conf
worker_processes  1;

error_log D:/codes/appsmith/nginx-1.26.2/logs/error.log info;
# error_log logs/error.log info;

pid D:/codes/appsmith/app/client/nginx/wildcard-nginx.pid;
# pid logs/wildcard-nginx.pid;


events {
    worker_connections 1024;
}

http {
    map $http_x_forwarded_proto $origin_scheme {
        default $http_x_forwarded_proto;
        '' $scheme;
    }

    include D:/codes/appsmith/nginx-1.26.2/conf/mime.types;
    # include conf/mime.types;
    default_type application/octet-stream;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    access_log logs/access.log;

    gzip on;
    gzip_types *;


    server {
        listen 80 default_server;
        server_name dev.appsmith.com;
        return 301 https://$host$request_uri;
    }

    server {

        listen 443 ssl default_server;
        http2 on;
        server_name dev.appsmith.com;
        ssl_certificate 'd:/codes/appsmith/app/client/nginx/dev.appsmith.com.pem';
        ssl_certificate_key 'd:/codes/appsmith/app/client/nginx/dev.appsmith.com-key.pem';

        client_max_body_size 150m;
        gzip on;

        proxy_ssl_server_name on;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header X-Forwarded-Proto $origin_scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header Accept-Encoding '';

        # https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors
        add_header Content-Security-Policy "frame-ancestors 'self' *";

        # Disable caching completely. This is dev-time config, caching causes more problems than it solves.
        # Taken from <https://stackoverflow.com/a/2068407/151048>.
        add_header Cache-Control 'no-store, must-revalidate' always;
        proxy_hide_header Cache-Control;  # Hide it, if present in upstream's response.

        sub_filter_once off;
        location / {
            proxy_pass http://localhost:3000;
            sub_filter '{{env "APPSMITH_CLOUD_HOSTING"}}' '';
            sub_filter '{{env "APPSMITH_AIRGAP_ENABLED"}}' '';
            sub_filter '{{env "APPSMITH_REO_CLIENT_ID"}}' '';
            sub_filter '{{env "APPSMITH_CLIENT_LOG_LEVEL"}}' '';
            sub_filter '{{env "APPSMITH_INTERCOM_APP_ID"}}' '';
            sub_filter '{{env "APPSMITH_DISABLE_INTERCOM"}}' '';
            sub_filter '{{env "APPSMITH_SENTRY_DSN"}}' '';
            sub_filter '{{env "APPSMITH_SENTRY_DSN"}}' '';
            sub_filter '{{env "APPSMITH_SENTRY_RELEASE"}}' '';
            sub_filter '{{env "APPSMITH_SENTRY_ENVIRONMENT"}}' '';
            sub_filter '{{env "APPSMITH_SMART_LOOK_ID"}}' '';
            sub_filter '{{env "APPSMITH_SEGMENT_KEY"}}' '';
            sub_filter '{{env "APPSMITH_SEGMENT_CE_KEY"}}' '';
            sub_filter '{{env "APPSMITH_DEPLOYMENT_NAME"}}' '';
            sub_filter '{{env "APPSMITH_HOSTNAME"}}' '';
            sub_filter '{{env "APPSMITH_FRONTEND_TRACING_URL"}}' '';
            sub_filter '{{env "APPSMITH_FUSIONCHARTS_LICENSE_KEY"}}' '';
            sub_filter '{{env "APPSMITH_SEGMENT_KEY"}}' '';
            sub_filter '{{env "APPSMITH_MIXPANEL_KEY"}}' '';
            sub_filter '{{env "APPSMITH_VERSION_ID"}}' 'v1.57.0-SNAPSHOT';
            sub_filter '{{env "APPSMITH_VERSION_SHA"}}' '';
            sub_filter '{{env "APPSMITH_VERSION_RELEASE_DATE"}}' '';
            sub_filter '{{env "APPSMITH_MAIL_ENABLED"}}' 'false';
            sub_filter '{{env "APPSMITH_RECAPTCHA_SITE_KEY"}}' '';
            sub_filter '{{env "APPSMITH_HIDE_WATERMARK"}}' '';
            sub_filter '{{env "APPSMITH_DISABLE_IFRAME_WIDGET_SANDBOX"}}' '';
            sub_filter '{{env "APPSMITH_CUSTOMER_PORTAL_URL"}}' '';
            sub_filter '{{env "APPSMITH_PRICING_URL"}}' '';
        }

        location /api {
            # proxy_pass https://release.app.appsmith.com;
            proxy_pass http://localhost:8000;
        }

        location /oauth2 {
            # proxy_pass https://release.app.appsmith.com;
            proxy_pass http://localhost:8000;
        }

        location /login {
            # proxy_pass https://release.app.appsmith.com;
            proxy_pass http://localhost:8000;
        }

        location /rts {
            proxy_pass http://localhost:8091;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header Connection upgrade;
            proxy_set_header Upgrade $http_upgrade;
        }
    }
}


```


## MAC 



