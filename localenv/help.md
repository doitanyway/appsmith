# 本地环境搭建



## 本地mongodb


```bash
# 启动mongo 容器
$ docker run -d -p 127.0.0.1:27017:27017 --name appsmith-mongodb --hostname=localhost -e MONGO_INITDB_DATABASE=appsmith -v appsmith-mongo-data:/data/db mongo --replSet rs0

# 进入容器
$ docker exec -it appsmith-mongodb bash
# 初始化mongodb
root@localhost:/# mongosh
# 查看副本状态
test> rs.initiate({"_id": "rs0", "members" : [{"_id":0 , "host": "localhost:27017" }]})
test> rs.status()

## 清理容器
docker stop appsmith-mongodb
docker rm appsmith-mongodb
```



## 本地redis

```bash
docker run -d -p 127.0.0.1:6379:6379 --name appsmith-redis redis:7.2.7

## 清理容器
docker stop appsmith-redis
docker rm appsmith-redis

````


## node和java（按需）


```bash
nvm install v20.11.1
nvm use v20.11.1
# 临时配置java
export JAVA_HOME=/d/software/jdks/jdk-17.0.6
export PATH=$JAVA_HOME/bin:$PATH
```

## 打开前端


```bash
cd app/client
yarn install
yarn start
```

## 打开前端



```bash
cd app/client/docker && mkcert -install && mkcert "*.appsmith.com" && cd ../../..
#  配置host文件  127.0.0.1 dev.appsmith.com
cd app/client
#  uses Appsmith's staging backend server as backend for your local frontend code
./start-https.sh https://release.app.appsmith.com

./start-https.sh https://release.app.appsmith.com  --without-docker
# if nginx is installed locally
./start-https.sh http://localhost:8080  --without-docker

# // if nginx is running on docker
./start-https.sh http://host.docker.internal:8000   --without-docker

# 官方目前对windows支持还有问题，如上代码启动在windows上修改还有问题，请参考如下说明修改
# 在 appsmith\app\client\nginx 下生成证书文件和配置文件：dev.appsmith.com.pem、dev.appsmith.com-key.pem、nginx.dev.conf，
# 按实际目录修改文件路径：
# error_log D:/codes/appsmith/nginx-1.26.2/logs/error.log info;
# pid D:/codes/appsmith/app/client/nginx/wildcard-nginx.pid;
# include D:/codes/appsmith/nginx-1.26.2/conf/mime.types;
# ssl_certificate 'd:/codes/appsmith/app/client/nginx/dev.appsmith.com.pem';
# ssl_certificate_key 'd:/codes/appsmith/app/client/nginx/dev.appsmith.com-key.pem';
# 前台启动
nginx -c /d/codes/appsmith/app/client/nginx/nginx.dev.conf -p /d/codes/appsmith/nginx-1.26.2
# 后台启动
nginx -c /d/codes/appsmith/app/client/nginx/nginx.dev.conf -p /d/codes/appsmith/nginx-1.26.2 -g "daemon on;"
# 关闭NGINX
nginx -c /d/codes/appsmith/app/client/nginx/nginx.dev.conf -p /d/codes/appsmith/nginx-1.26.2 -s quit

```

> [安装nginx](./nginx.md)

## 打开后端


```bash

export JAVA_HOME=/d/software/jdks/jdk-17.0.6
export PATH=$JAVA_HOME/bin:$PATH

cd  app/server


# 从源代码生成idea需要的类
mvn clean compile
# 初始化环境文件
cp envs/dev.env.example .env

#
./build.sh -DskipTests



```


```bash
docker rm appsmith;

cd ~/appsmith;

rm -rf stacks;

docker pull appsmith/appsmith-ce

docker run -d --name appsmith -p 8000:80 appsmith/appsmith-ce:latest;

docker logs -f appsmith;

./start-https.sh http://localhost:8080                // if nginx is installed locally
./start-https.sh http://host.docker.internal:8000     // if nginx is running on docker
```


## 打开RTS

```bash
$ cd app/client/packages/rts
$ yarn install
$ yarn start

RTS version SNAPSHOT running at http://localhost:8091
```
