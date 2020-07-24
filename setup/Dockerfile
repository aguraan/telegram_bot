FROM mongo:4.2.8

WORKDIR /usr/src/configs

COPY replicaSet.js .
COPY setup.sh .

CMD ["./setup.sh"]