#!/bin/bash
set -e

# MongoDB 서비스가 실행 중이고 명령을 받을 수 있을 때까지 대기
until mongosh --eval "print('MongoDB is ready')" > /dev/null 2>&1; do
    echo 'Waiting for MongoDB to initialize...'
    sleep 2
done
echo 'MongoDB initialized.'

# MongoDB 셸 스크립트 실행
mongosh <<EOF
use admin
db.createUser({
    user: 'admin',
    pwd: '1234',  // 여기서 비밀번호는 보안에 맞게 강력한 것으로 설정하세요
    roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }, 'readWriteAnyDatabase']
})
EOF
echo 'Admin user created.'