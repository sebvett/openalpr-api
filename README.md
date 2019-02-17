# OpenALPR API
Create a Docker providing a RESTful API for OpenALPR plate recognition in an image

## Building Docker
Clone the repo, `cd` in to it and run `docker build .`

The build must happen at at the same level as `openalpr-docker/` for the Node to be copied in

## Using Docker
- Run with `docker run -d --rm -p 3000:3000 $dockername`
(API is run on Docker port 3000, can be mapped to anything on the host machine)

- Use something like httpie to POST an image file to your chosen port with the fieldname 'file' (e.g. `http -f POST http://localhost:3000/ file@/home/sebvett/recogniseme.jpg`)

- JSON will be returned with the output of OpenALPR: ```"{\"version\":2,\"data_type\":\"alpr_results\",\"epoch_time\":1550424567135,\"img_width\":1273,\"img_height\":954,\"processing_time_ms\":354.058563,\"regions_of_interest\":[],\"results\":[{\"plate\":\"4TMR754\",\"confidence\":89.362747,\"matches_template\":0,\"plate_index\":0,\"region\":\"\",\"region_confidence\":0,\"processing_time_ms\":19.986914,\"requested_topn\":10,\"coordinates\":[{\"x\":511,\"y\":659},{\"x\":622,\"y\":661},{\"x\":622,\"y\":717},{\"x\":511,\"y\":716}],\"candidates\":[{\"plate\":\"4TMR754\",\"confidence\":89.362747,\"matches_template\":0},{\"plate\":\"4TMR54\",\"confidence\":87.263382,\"matches_template\":0},{\"plate\":\"4TMR7S4\",\"confidence\":78.724365,\"matches_template\":0},{\"plate\":\"4THR754\",\"confidence\":77.258469,\"matches_template\":0},{\"plate\":\"4TMRS4\",\"confidence\":76.625000,\"matches_template\":0},{\"plate\":\"4THR54\",\"confidence\":75.159096,\"matches_template\":0},{\"plate\":\"4TMR74\",\"confidence\":74.397087,\"matches_template\":0},{\"plate\":\"4TR754\",\"confidence\":74.252625,\"matches_template\":0},{\"plate\":\"4TMR4\",\"confidence\":72.297722,\"matches_template\":0},{\"plate\":\"4TR54\",\"confidence\":72.153252,\"matches_template\":0}]}]}\n"```
