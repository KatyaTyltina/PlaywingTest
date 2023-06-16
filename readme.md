# Playwing test project

### Framework: Symfony

### Template: 
  ``templates/base.html.twig``

### Locate EN:
``translations/messages.en.yaml``

### Locate AR:
``translations/messages.pa.yaml``

### TEST

1. Generate css
```
sass styles/main.scss public/build/style.css
```
2. Run docker compose
```
docker-compose -f docker-compose.yml up
```
3. Open container terminal in another session
```
docker exec -it playwing /bin/bash
```
4. Install symfonycli
```
cd /tmp
wget https://get.symfony.com/cli/installer -O - | bash
mv /root/.symfony5/bin/symfony /usr/local/bin/symfony
cd /var/www/symfony
```
5. Run symfony local server in container terminal
```
symfony server:start
```
6. Open project
[http://localhost:8000](http://localhost:8000)


