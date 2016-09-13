/*
	To demonstrate while loop a bit better
 */

#include <stdio.h>
#include <math.h>

int main() {
	char wish_to_continue = 'N';
	int number;

	printf("**Outside the while loop**\n\n");

	while(wish_to_continue != 'N') {
		printf("**At the top of the while loop!**\n");
		printf("Enter a number: ");
		scanf("%d", &number);

		printf("The entered number is square of %f\n", sqrt(number));
		printf("To stop exploring square roots, press 'N'. ")
		printf("Press any other key to continue.\n");
		scanf("%c", &wish_to_continue);
	}

	printf("Exited the loop. Exiting the program. Bye!\n");
	return 0;
}