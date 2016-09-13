#include <stdio.h>

int main() {
	int table_of;

	printf("Which number's mulitplication table do you want to print? ");
	scanf("%d", &table_of);

	// the loop variable
	int i;
	for( i = 1; i <= 10; i++ ) {
		printf("%d x %d = %d\n", table_of, i, table_of * i);
	}
	return 0;
}