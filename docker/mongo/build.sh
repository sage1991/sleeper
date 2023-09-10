while getopts u:p: flag
do
  case "${flag}" in
    u) root_username=$OPTARG;;
    p) root_password=$OPTARG;;
    *) echo "$flag is not the option" && exit 1;;
  esac
done

if [ -z "$root_username" ]; then
  echo "root username required"
  exit 1
fi

if [ -z "$root_password" ]; then
  echo "root password required"
  exit 1
fi

docker build \
  --build-arg "root_password=$root_password" \
  --build-arg "root_username=$root_username" \
  -f ./docker/mongo/Dockerfile \
  -t sleeper-mongo \
  .
