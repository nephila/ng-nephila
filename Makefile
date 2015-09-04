
release-lib:
	git add bower.json
	git add package.json
	git commit -m "Bump version number to $(VERSION)"
	git tag -a v$(VERSION) -m 'Version $(VERSION)'
	git push --tags
	git push origin master

release-bower:
	gulp pkg-bower
	cd bower_pkg && \
	git commit -a -m "Bump version number to $(VERSION)" && \
	git tag -a v$(VERSION) -m 'Version $(VERSION)' && \
	git push --tags && \
	git push origin master

register-bower:
	cd bower_pkg && \
	bower register ng-nephila git://github.com/nephila/bower-ng-nephila.git

release: release-lib release-bower