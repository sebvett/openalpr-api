FROM ubuntu:18.04

# Install prerequisites, in apt and npm.
RUN apt-get update\
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    openalpr\
    openalpr-daemon\
    openalpr-utils\
    libopenalpr-dev\
    inotify-tools\
    nodejs\
    npm

# Include the alpr-api Node folder
COPY ./openalpr-docker /openalpr-docker

# Change directory first so npm install works
workdir /openalpr-docker

# Temporarily moved npm install for development purposes
# Copy OpenALPR models to where it actually looks at them (because it looks at the right place and the wrong place)
RUN npm install\
  && cp /usr/share/openalpr/runtime_data/ocr/tessdata/* /usr/share/openalpr/runtime_data/ocr/\
  && set TESSDATA_PREFIX='/usr/share/openalpr/runtime_data/ocr/'

# Launch the Node APi
ENTRYPOINT node ./alpr-api.js
