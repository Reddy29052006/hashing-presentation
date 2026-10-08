# Hashing in Data Structures

## 1. Start with a Real-Life Situation

Before going directly into hashing, let me ask you one simple question.

I think you have faced this situation. After qualifying for the EAMCET exam, you go for counseling, right?

Before going to counseling, how do you arrange your documents?

You have many different documents, right?

* Aadhaar card
* College certificates
* Mark memos
* TC and study certificate
* etc.

Now imagine all these documents are kept together in one big file.

On the counseling day, the evaluator asks you:

> “Can you give me your 10th class mark memo?”

How will you find it?

You may say:

> “I will open the file and check the documents one by one until I find my mark memo.”

Correct?

So basically, we are doing:

```text
Document 1 → Check
Document 2 → Check
Document 3 → Check
Document 4 → Check
...
Mark Memo → Found!
```

This is similar to **linear search**, because we are checking one element after another.

---

# 2. Identify the Problem

Now imagine instead of having 20 documents, we have **1 lakh documents**.

Every time we need a particular document, we have to check them one by one.

It will take a lot of time.

So, can we somehow find the required document **without checking every document one by one?**

Can we do something like:

```text
Identify the document
        ↓
Determine its location
        ↓
Go directly to that location
        ↓
Find the document
```

That would be much faster, right?

And this is the basic problem that **hashing tries to solve**.

---

# 3. Definition of Hashing

So, what exactly is hashing?

**Hashing is a technique of mapping keys to specific locations in a hash table using a hash function, allowing fast insertion, deletion, and searching.**

But before understanding how this works, we need to understand one important concept:

**What is a key?**

---

# 4. What is a Key?

Let's take our document example again.

Suppose there are many Aadhaar cards in the same place.

How can we identify **my Aadhaar** from all the other Aadhaar cards?

We can use the **Aadhaar number**.

The Aadhaar number helps us identify a particular person's document.

Similarly:

* Mark memo → **Hall Ticket Number**
* Bank document → **Account Number**
* Aadhaar document → **Aadhaar Number**

So, the value that helps us **identify a particular record** is called a **key**.

In simple words:

**Key = A value used to identify a particular record.**

Now we have a key.

But there is still one question:

> **How can we use this key to find the location of the document?**

This is where the **hash function** comes in.

---

# 5. Hash Function

Suppose my Aadhaar number is:

**1234**

We know that **1234** identifies my document.

So, imagine our file can hold 10 different documents:

```text
0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
          These are the locations
```

Now we perform some calculation using the key.

For example:

```text
1234 → Calculation → 4
```

The result is **4**.

So we can say:

> “Keep this document at location 4.”

Later, when we want the same document, we perform the same calculation again:

```text
1234 → Calculation → 4
```

We get position **4** again.

So instead of checking every document one by one, we can directly go to position 4.

The calculation that converts a **key into a location** is called a **hash function**.

In simple words:

```text
Key
 ↓
Hash Function
 ↓
Location
```

This is the basic idea behind hashing.

---

# 6. Hash Table

Now we know the location. But one question is still open.

We calculated position **4**. But where are we actually keeping the document?

We need some structure that contains these positions, where our documents can be stored.

That structure is called a **HASH TABLE**.

```text
KEY
 ↓
HASH FUNCTION
 ↓
LOCATION
 ↓
HASH TABLE
 ↓
DOCUMENT
```

So the document is stored like this:

```text
HASH TABLE

Index | Document
  0   |
  1   |
  2   |
  3   |
  4   | Aadhaar - 1234     ← stored here
  5   |
  6   |
  7   |
  8   |
  9   |
```

The Aadhaar document moves into position 4.

**Position 4 is where the document is stored.**

Now, later the evaluator asks for the same Aadhaar document. What do we do?

We take the key **1234** and run the same hash function again:

```text
1234
 ↓
Same Hash Function
 ↓
Position 4
 ↓
Aadhaar Document
```

We directly reach the required position. We do not check every document.

In simple words:

**Hash Table = A structure that stores documents using positions calculated from their keys.**

Formally:

**Hash Table = A data structure that stores key-value pairs at locations determined by a hash function.**

So there are three different things:

```text
KEY
1234
"Who is the document?"
        ↓
HASH FUNCTION
1234 → 4
"Where should it go?"
        ↓
HASH TABLE
Position 4 → Document
"Where is it stored?"
```

* **Key** identifies the document.
* **Hash function** calculates the location.
* **Hash table** stores the document at that location.

Now we know where the document is stored...

But what happens when another document also gets the **same position**?

---

# 7. Collision

Now the real problem enters the game.

Suppose another document comes.

Its key is:

**5678**

When we perform the calculation:

```text
5678 → Calculation → 4
```

Again, we get **position 4**.

But position 4 is already occupied by another document.

This is called a **collision**.

In simple words:

> **When two different keys produce the same location, it is called a collision.**

For example:

```text
1234 → Position 4

5678 → Position 4
```

The keys are different, but both are trying to occupy the same position.

There are two methods to handle this collision:

1. **Open Hashing**
2. **Closed Hashing**

Now let's see how each method handles a collision.

# 8. Applications of Hashing

Transition line:

> "Now we understand how hashing helps us find data quickly. But where do we actually use hashing in real life?"

Three applications, revealed one by one.

## Application 1 � Password Storage

```text
Password
   ?
Hash Function
   ?
Hashed Value
   ?
Stored
```

Example:

```text
MyPassword123
      ?
 Hash Function
      ?
   8f3a...
      ?
 Stored Hash
```

Login:

```text
Entered Password
      ?
 Hash Function
      ?
 Compare with Stored Hash
```

**Hashing ? Helps protect stored passwords**

## Application 2 � Database Searching

```text
Student ID
101
102
103
104
105
...
```

Search: `Student ID = 103`

```text
Student ID 103
      ?
 Hash Function
      ?
 Table Position
      ?
 Student Record
```

Same pipeline as before:

```text
KEY ? HASH FUNCTION ? LOCATION ? DATA
```

**Hashing ? Fast searching**

## Application 3 � File / Data Deduplication

```text
File A ? Hash ? ABC123
File B ? Hash ? ABC123
```

```text
Same Hash
     ?
Possible Same Content
```

**Hashing ? Helps identify duplicate data**

## Final Visual

```text
             HASHING
                �
     +----------+----------+
     ?          ?          ?
 Password    Database    Files
 Storage     Search      Deduplication
     �          �          �
 Security      Speed    Identify
```

Final statement:

> **"The application may change, but the basic idea remains the same: use a key to quickly work with data."**
