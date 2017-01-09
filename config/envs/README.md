This env.* files should reside in the project root with the name: .env

For example, in the dev environment:

```
$ pwd
/home/rhf/git/sns-reduction

$ ls -la
(...)
-rw-r--r--  1 rhf users   257 Jan  5 16:54 .env
(...)

$ cat .env 

DEBUG=True

SECRET_KEY=qwerty1234567890!@#$%^&*()

DATABASE_URL=postgres://reduction:reduction@localhost:5432/reduction

# Only used if DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,lealpc.ornl.gov

STATIC_ROOT=../dist/static

```