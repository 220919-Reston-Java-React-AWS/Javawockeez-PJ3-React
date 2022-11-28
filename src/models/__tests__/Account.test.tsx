import Account from "../Account";

/************ Any Required Set Up or Mocking to be done ************/


// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/

it('constructing account class',() =>{
    const testAccount = new Account(1,'test@gmail.com', 'password', 'test', 'user');

    expect(testAccount).toBeDefined;
});

it('test class property values',() =>{
    const testAccount = new Account(1,'test@gmail.com', 'password', 'test', 'user');

    expect(testAccount.id).toBe(1);
    expect(testAccount.email).toBe("test@gmail.com");
    expect(testAccount.password).toBe("password");
    expect(testAccount.firstName).toBe("test");
    expect(testAccount.lastName).toBe("user");
});