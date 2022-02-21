FROM openjdk:11
# FROM<image>
VOLUME /tmp
# Temporary location to run
EXPOSE 8080
# Provide port number
ADD target/HorariosAPI-1.1.jar HorariosAPI-1.1.jar
ENTRYPOINT ["java","-jar","/HorariosAPI-1.1.jar"]
# command to execute jar