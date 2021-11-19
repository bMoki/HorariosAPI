FROM openjdk:11
# FROM<image>
VOLUME /tmp
# Temporary location to run
EXPOSE 8080
# Provide port number
ADD target/HorariosAPI-0.0.1-SNAPSHOT.jar HorariosAPI-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/HorariosAPI-0.0.1-SNAPSHOT.jar"]
# command to execute jar