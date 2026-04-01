FROM almalinux:9
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN dnf update -y \
    && dnf install -y python3-pip\
    && dnf install -y python3 \
    && pip3 install -r requirements.txt
COPY . /app
EXPOSE 8000
ENV DJANGO_SETTINGS=config.settings.dev
CMD ["sh", "-c", "python3 manage.py runserver 0.0.0.0:8000 --settings ${DJANGO_SETTINGS}"]