rm -rf src/pb
npx proto-loader-gen-types --longs=String --enums=String --defaults --grpcLib=@grpc/grpc-js --outDir=pb/ proto/*.proto