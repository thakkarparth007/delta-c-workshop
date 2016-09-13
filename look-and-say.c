#include <stdio.h>

int main() {
	int n;
	scanf("%d", &n);

	if(n <= 0) return 0;

	int a[1000];
	a[0] = 1;
	printf("1 ");
	n--;			// 1 term printed.

	int lastIndex = 0;
	int sz = 1;
	int i = 0;

	while(n>=0) {
		lastIndex = sz-1;

		for(i = 0; i <= lastIndex; ) {
			int curNum = a[i];
			int curCount = 1;

			while(++i <= lastIndex && curNum == a[i]) {
				curCount++;
			}

			n -= 2;
			a[sz] = curCount;
			a[sz+1] = curNum;

			printf("%d ", curCount);
			if(n >= 0)
				printf("%d ", curNum);

			sz += 2;
		}
	}
	printf("\n");
	return 0;
}
