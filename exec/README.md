# 시스템 환경
---
## Ethereum server 
SENAGI의 블록체인 서버는 아래와 같은 환경에서 작동되고 있습니다.
- Ubuntu 20.04 LTS
- Intel(R) Xeon (R) CPU E5-2686 v4 @ 2.30GHz
- CPU 코어 당 물리 CPU : 4
- Memory : 16Gb
---
## Content server
SENAGI의 핵심 기능을 제공하는 서버는 아래와 같은 환경에서 작동되고 있습니다.
- Ubuntu 20.04 LTS
- Intel(R) Xeon (R) CPU E5-2686 v4 @ 2.30GHz
- CPU 코어 당 물리 CPU : 4
- Memory : 16Gb

---
# 시스템 구성 및 설치
## Ethereum
- Geth `1.10.15-stable`
- Go `1.18`
- solc `0.7.1`   

**GO 설치하기**
```bash
sudo apt install software-propeties-common
sudo add-apt-repository ppa:longsleep/golang-backprots
sudo apt update 
sudo apt install golang-go
go version
```

**Geth 설치하기**
```bash
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt update
sudo apt install ethereum
sudo apt install solc

# 정상 설치 확인
which geth
which solc
geth version
```

## Content
- Docker `20.10.14`

**Docker 설치하기**
```bash
sudo apt update
sudo apt insall ca-certificates curl gnupg lsb-release
# Add Docker's offical GPG key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

#Use the following command to set up the stable repository. To add the nightly or test repository, add the word nightly or test (or both) after the word stable in the commands below.
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
docker version
```

**MySQL 설치하기**

```bash
sudo docker pull mysql:8.0
```
---
# 프로세스 실행
## Ethereum

**Genesis block 작성**
```JSON
{
  "config": {
    "chainId": 15,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "ethash": {}
  },
  "difficulty": "0x4000",
  "gasLimit": "8000000",
  "alloc": {}
}
```

**Block 초기화**
```bash
geth --datadir . init genesis.json
```

**Geth 실행하기**
```bash
# 백그라운드 실행 
nohup geth --networkid 15 --nodiscover --maxpeers 2 --datadir ~/blockchain --miner.gasprice 0 --http --http.addr "0.0.0.0" --http.corsdomain '*' --http.api admin,eth,debug,miner,net,txpool,personal,web3 --http.vhosts '*' 2>> ~/blockchain/geth.log &
```

**Owner 계정 생성**
```bash
geth attach http://{domain}:8545

# Geth 접속
personal.newAccount("{password}") # coinbase가 될 계정
```
./keystore에 생성된 파일을 Content server의 /var/backend/keystore에 `admin.wallet`로 저장

**Token, Member contract 배포**
``` bash
# geth에서 contract deploy 하기

// Member
var memberAbi = eth.contract({Member.abi})
var memberBin = '0x{Member.bin}'
var memberDeploy = {from: eth.accounts[0], gas: 3000000, data: memberBin}
var memberInstance = memberAbi.new(memberDeploy)
// a few moment later....
var memberAddr = membeInstace.address

// Token
var tokenAbi = eth.contract({Token.abi})
var tokenBin = '0x{Token.bin}'
var tokenDeploy = {from: eth.accounts[0], gas: 3000000, data: tokenBin}
var tokenInstance = tokenAbi.new("사료","톨",memberAddr,tokenDeploy)
```
- member/token.abi , bin 파일은 solc로 sol 파일을 컴파일 한 결과를 의미합니다.
- memberInstance, tokenInstance로부터 얻은 address 주소를 content 서버에 기입해주어야합니다.
---
## Content
**Docker 권한 및 network 생성**
```bash
# docker ubuntu에게 권한 부여
sudo usermod -aG docker ubuntu

# 도커 컨테이너 간 DNS resolution 제공 (user-defined bridges)
docker network create SENAGI
```

**Jenkins container**
```bash
#sudo usermod -aG docker ubuntu
docker pull jenkins/jenkins:lts-jdk11

sudo mkdir /var/jenkins
sudo chown 1000 /var/jenkins
docker run -d \
--name jenkins \
--network SENAGI \
-p 9090:8080 -p 50000:50000 \
-v /var/jenkins:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/bin/docker:/usr/bin/docker \
jenkins/jenkins:lts-jdk11
```

**Mysql container**
```
docker run -d \
--name mysql \
--network SENAGI \
-p 17177:3306 \
-v /var/mysql/db:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=ssafy \
mysql:8.0
```

**Mysql 계정 생성**
```bash
docker exec -it mysql bash
mysql -u root -p
# Enter password : ssafy

# root 이름 변경
use mysql;
update user set user='senagi' where user='root';
flush privileges;

# 권한 부여
CREATE USER 'ssafy'@'%' IDENTIFIED BY 'ssafyb105'; 
GRANT ALL PRIVILEGES ON *.* TO 'ssafy'@'%'; 
flush privileges;

# 시간 설정
select @@global.time_zone, @@session.time_zone;
SET GLOBAL time_zone='Asia/Seoul';
SET time_zone='Asia/Seoul';
```
**Backend 환경 설정**
git repository root directory에서 command 실행
```bash
cd BE/src/main/resources
sudo vim application-eth.yml

contract:
    token: {Ethereum server에서 배포했던 token contract의 address}
    member: {Ethereum server에서 배포했던 member contract의 address}

admin:
    password: {Ethereum server에서 newAccount의 매개변수로 등록한 비밀번호}
    account: {Ethereum server에서 생성한 계정의 address}

```
**Docker로 FE/BE 이미지 파일 빌드 및 컨테이너 생성**   
git repository root directory에서 command 실행
```bash
# Frontend
docker build -t frontend:latest ./FE 
docker run -d \
    --name frontend \
    --network SENAGI \
    -p 80:80 \
    -p 443:443 \
    -v /etc/letsencrypt:/etc/letsencrypt \
    frontend:latest

# Backend
docker build -t backend:latest ./BE 
docker run -d \
    --name backend \
    --network SENAGI \
    -p 8080:8080 \
    -v /var/backend/keystore:/keystore \
    -v /var/backend/imgs:/imgs \
    -v /var/backend/logs:/logs \
    backend:latest
```