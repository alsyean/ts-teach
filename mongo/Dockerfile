FROM mongo:latest

# MongoDB 설정 파일 추가
COPY mongod.conf /etc/mongo/mongod.conf

# 초기 사용자 설정 스크립트 추가
COPY setup.sh /docker-entrypoint-initdb.d/

# 포트 설정
EXPOSE 27017