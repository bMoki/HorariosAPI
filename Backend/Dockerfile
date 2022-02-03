FROM openjdk:11
# FROM<image>
VOLUME /tmp
# Temporary location to run
EXPOSE 8080
# Provide port number
ADD target/HorariosAPI-0.6-BETA.jar HorariosAPI-0.6-BETA.jar
ENTRYPOINT ["java","-jar","/HorariosAPI-0.6-BETA.jar"]
# command to execute jar