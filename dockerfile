FROM ubuntu:18.04
# FROM ubuntu:16.04
# Install Essentials
# RUN rm -rf /var/lib/apt/lists/* && apt-get clean && apt-get update && apt-get upgrade -y \
#     && apt-get install -y --no-install-recommends curl ca-certificates apt-utils\
#     && rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install -y git \
            udev \
			software-properties-common\
			autoconf \
			libtool \
			pkg-config \
			libsystemd-dev \
			libudev-dev \
			flex \
			usbutils \
            libusb-1.0-0-dev \
            pcscd \
            kmod

RUN apt-get -y install openjdk-8-jdk

RUN apt-get -y install pcscd
RUN apt-get -y install libpcsclite1 libpcsclite-dev

RUN apt-get -y install curl
RUN apt-get -y install nano

RUN apt-get -y install nodejs 
RUN apt-get -y install npm

RUN npm install -g n
RUN n 16.2

# issue
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update
RUN apt-get -y upgrade
RUN apt install -y python3-pip
RUN apt-get install -y python3.8
# RUN apt-get -y install python3


RUN apt-get -y install glibc-source
RUN apt-get -y install libc-bin libc6 libc6-dbg
RUN apt-cache policy libc6

RUN apt --fix-broken install

RUN npm install -g node-gyp

WORKDIR /

COPY . .

RUN npm install

EXPOSE 13252


# CMD ["npm", "run", "forever"] 
CMD ["npm", "run", "serve"] 