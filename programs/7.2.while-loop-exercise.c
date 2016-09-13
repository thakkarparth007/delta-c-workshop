#include <stdio.h>

int main() {
	int number;

	scanf("%d", &number);

	int reversed = 0;
	int last_digit = 0;

	while(number != 0) {
		last_digit = number % 10;
		reverse = reversed*10 + last_digit;
		number = number / 10;		

		/* 
			integer division! Result is an integer. 
			Essentially we are removing the last digit.
		*/
	}

	printf("%d", reversed);
	return 0;
}