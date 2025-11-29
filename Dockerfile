FROM node:24-bookworm AS frontend
RUN apt-get update && apt-get install -y make

FROM golang:1.25-bookworm AS backend

RUN apt-get update && apt-get install -y make
RUN go install github.com/air-verse/air@latest

